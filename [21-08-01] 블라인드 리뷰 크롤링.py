from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
import time, math

from bs4 import BeautifulSoup 

from selenium.webdriver.remote.webelement import WebElement

dataContainer = [
    [
        '제목', '재직형태', '직무', '작성일', '장점', '단점' '총점',
        '커리어_향상', '업무와_삶의_균형', '급여_및_복지', '사내_문화', '경영진'
    ]
]

driver = webdriver.Chrome("C:\\chromedriver.exe")
driver.implicitly_wait(2)       # chromedriver 자원로드 대기
driver.maximize_window()        # 전체화면

# 블라인드 접속
driver.get('https://www.teamblind.com/kr/')
driver.find_element_by_css_selector('.btn_signin').click()

while True:
    try:
        driver.find_element_by_css_selector('.ly-signin')
        time.sleep(1)
        print('OTP 창이 아직 있습니다')
    except NoSuchElementException:
        break

driver.get('https://www.teamblind.com/kr/company')

searchBox = driver.find_element_by_css_selector('.inp')
searchBox.send_keys('삼성전자')
searchBox.click()
time.sleep(2)

driver.find_element_by_css_selector('.auto_wp ul li').click()
time.sleep(2)

driver.get(driver.current_url + 'reviews')

reviewPageBaseUrl = driver.current_url + '?page={pageNum}'
totalReviewCount = int(driver.find_element_by_css_selector('.count').text.split('개')[0].replace(',', ''))
maxReviewPage = math.ceil(totalReviewCount / 30)
# maxReviewPage = 2

for pageNum in range(1, (maxReviewPage + 1)):
    # print(reviewPageBaseUrl.format(pageNum = pageNum))
    driver.get(reviewPageBaseUrl.format(pageNum = pageNum))

    reviews = driver.find_elements_by_css_selector('.review_item')
    for review in reviews:
        dataDict = {}

        제목 = review.find_element_by_css_selector('.rvtit a').text
        dataDict['제목'] = 제목
        재직형태 = review.find_element_by_css_selector('.auth strong').text.split('\n')[1]
        dataDict['재직형태'] = 제목

        authHtml = review.find_element_by_css_selector('.auth').get_attribute('innerHTML')
        soup = BeautifulSoup(authHtml, 'html.parser')
        soup.select_one('strong').extract()

        직무_날짜 = '·'.join(soup.text.split('·')[2:])

        직무 = 직무_날짜.split('-')[0].strip()
        작성일 = 직무_날짜.split('-')[1].strip()

        dataDict['직무'] = 직무
        dataDict['작성일'] = 작성일

        # 장점 = review.find_elements_by_css_selector('.parag span')[0].text
        # 단점 = review.find_elements_by_css_selector('.parag span')[1].text
        # dataDict['장점'] = 장점
        # dataDict['단점'] = 단점
        장점 = ''
        단점 = ''

        총점 = review.find_element_by_css_selector('.rating .num').text.split('\n')[1]
        dataDict['총점'] = 총점

        review.find_element_by_css_selector('.more_rating').click()
        detailRating = review.find_elements_by_css_selector('.ly_rating .rating_wp')

        커리어_향상 = detailRating[0].find_element_by_css_selector('.vue-star-rating-rating-text').text
        업무와_삶의_균형 = detailRating[1].find_element_by_css_selector('.vue-star-rating-rating-text').text
        급여_및_복지 = detailRating[2].find_element_by_css_selector('.vue-star-rating-rating-text').text
        사내_문화 = detailRating[3].find_element_by_css_selector('.vue-star-rating-rating-text').text
        경영진 = detailRating[4].find_element_by_css_selector('.vue-star-rating-rating-text').text

        dataDict['커리어_향상'] = 커리어_향상
        dataDict['업무와_삶의_균형'] = 업무와_삶의_균형
        dataDict['급여_및_복지'] = 급여_및_복지
        dataDict['사내_문화'] = 사내_문화
        dataDict['경영진'] = 경영진

        print(dataDict)

        dataContainer.append([
            제목, 재직형태, 직무, 작성일, 장점, 단점, 총점, 
            커리어_향상, 업무와_삶의_균형, 급여_및_복지, 사내_문화, 경영진
        ])

#여기
with open('result', 'w', encoding='UTF-8') as f:
    f.write(str(dataContainer))

time.sleep(10)
driver.quit()
print('-')

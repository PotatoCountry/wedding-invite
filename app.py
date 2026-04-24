from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    # 청첩장 정보 - 여기서 텍스트를 수정하세요
    groom_name = "조현진"
    bride_name = "김혜린"
    wedding_date = "2026년 6월 28일 일요일 오후 1시"
    wedding_location = "서울특별시 동대문구 청량리교회"
    message = "저희 두 사람이 사랑의 결실을 맺어 새로운 가정을 이루게 되었습니다. 귀한 발걸음 해주시면 감사하겠습니다."
    image_path = "images/김혜진0055.jpg"  # static/images/ 폴더에 사진 파일을 넣으세요 

    return render_template(
        'index.html', 
        groom=groom_name, bride=bride_name, 
        date=wedding_date, 
        location=wedding_location, 
        message=message, 
        image=image_path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
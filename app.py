import cv2
import matplotlib.pyplot as plt
from flask import Flask, render_template, url_for, request
import pytesseract
pytesseract.pytesseract.tesseract_cmd = 'C:\\Program Files (x86)\\Tesseract-OCR\\tesseract.exe'

app = Flask(__name__)

def plotting(img1, img2, title1='', title2=''):
    fig = plt.figure(figsize=[15, 15])
    ax1 = fig.add_subplot(121)
    ax1.imshow(img1, cmap='gray')
    ax1.set(xticks=[], yticks=[], title=title1)

    ax2 = fig.add_subplot(122)
    ax2.imshow(img2, cmap='gray')
    ax2.set(xticks=[], yticks=[], title=title2)



@app.route('/')
def home():
    return render_template('home.html')

@app.route('/predict', methods=['POST'])
def predict():

    img_dir = 'data_number_plates/images'
    img1_path = "{}/{}".format(img_dir, "car_1.jpg")

    pic = cv2.imread(img1_path)
    grayPic = cv2.cvtColor(pic, cv2.COLOR_BGR2GRAY)
    blur = cv2.bilateralFilter(grayPic, 11, 90, 90)
    edges = cv2.Canny(blur, 30, 200)
    contours, new = cv2.findContours(edges.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    copy_pic = pic.copy()
    x = cv2.drawContours(copy_pic, contours, -1, (0, 0, 255), 2)
    contours_sorted = sorted(contours, key=cv2.contourArea, reverse=True)[:30]
    copy_pic2 = pic.copy()
    y = cv2.drawContours(copy_pic2, contours_sorted, -1, (255, 0, 0), 2)
    plotting(pic, copy_pic2)
    plate = None
    copy_pic3 = pic.copy()
    for c in contours_sorted:
        perimeter = cv2.arcLength(c, True)
        count_edges = cv2.approxPolyDP(c, 0.02 * perimeter, True)
        if len(count_edges) == 4:
            x, y, w, h = cv2.boundingRect(c)
            plate = copy_pic3[y:y + h, x:x + w]
            break
    cv2.imwrite('plate.png', plate)

    plotting(plate, plate)

    text = pytesseract.image_to_string(plate, lang='eng')
    #print(text)

    if request.method=='POST':
        return render_template('result.html', prediction=text)

    return render_template('result.html', prediction=text)


if __name__=='__main__':
    app.run(debug=True)


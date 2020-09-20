import pandas as pd
from pandas import ExcelWriter
from pandas import ExcelFile
import os
import shutil



w_d = os.getcwd()
w_d = os.path.join(w_d,'images')
train_dir = os.path.join(w_d,'train')
test_dir = os.path.join(w_d,'test')
e_train_dir= os.path.join(train_dir,'Emergency')
n_train_dir= os.path.join(train_dir,'Non Emergency')
e_test_dir= os.path.join(test_dir,'Emergency')
n_test_dir= os.path.join(test_dir,'Non Emergency')
os.mkdir(train_dir)
os.mkdir(test_dir)
os.mkdir(e_train_dir)
os.mkdir(n_train_dir)
os.mkdir(e_test_dir)
os.mkdir(n_test_dir)
print("Directories Created Successfully!")




df = pd.read_csv('train.csv')

print("Column headings:")
print(df.columns)

image_names, if_emergency = [],[]

for i in df.index:
	image_names.append(df['image_names'][i])
	if_emergency.append(df['emergency_or_not'][i])

loc='images'
for i in range(len(image_names)):
	if if_emergency[i]==0:
		image_path = os.path.join(loc,image_names[i])
		shutil.move(image_path,n_train_dir)

	elif if_emergency[i]==1:
		image_path = os.path.join(loc,image_names[i])
		shutil.move(image_path,e_train_dir)


df = pd.read_csv('test.csv')

print("Column headings:")
print(df.columns)


test_images=[]
for i in df.index:
	test_images.append(df['image_names'][i])

for i in range(len(test_images)):
	image_path = os.path.join(loc,test_images[i])
	shutil.move(image_path,test_dir)
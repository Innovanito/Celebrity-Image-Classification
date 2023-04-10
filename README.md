# Celebrity look-alike Web Application

## 사용 기술 스택들
Python, Flask, OpenCV, Html, CSS, Vanilla Javascript

## 웹사이트 UI
<div align="center">
  처음 메인 페이지
</div>
<img width="1218" alt="스크린샷 2023-04-10 오후 4 00 23" src="https://user-images.githubusercontent.com/72393144/230846079-2af8c131-3298-4d97-ac98-e216ddbf5f70.png">

이미지를 DropBox 에 놓으면 어떤 유명인과 비슷한지, 혹은 어떤 연예인인지 알려주는 웹사이트입니다.

<img width="1372" alt="스크린샷 2023-04-10 오후 4 07 43" src="https://user-images.githubusercontent.com/72393144/230847194-96dc8509-7f50-4ab7-96c2-dbf2e34d733a.png">


## 프로젝트 구조

<img width="1289" alt="스크린샷 2023-04-10 오후 4 09 42" src="https://user-images.githubusercontent.com/72393144/230847458-085a8f92-cec0-41ac-9f9c-b26901138d67.png">

1. 모델을 학습시킬 사진을 구글에서 100장 이상 다운로드 받습니다.
2. 모델 학습에 사용될 사진을 얼굴 부분만 선택적으로 자릅니다.
3. 학습에 사용시킬 바람직한 사진을 수작업으로 선택, 삭제를 합니다.
4. Python과 OpenCV로 사진에 대한 모델을 각 모델당 100장 정도로 학습시킵니다.
5. 얼굴부분 사진을 머신러닝 알고리즘을 사용해 가장 예측 정확도가 높은 알고리즘을 선택합니다.

```python
model_params = {
    'svm': {
        'model': svm.SVC(gamma='auto', probability=True),
        'params': {
            'svc__C': [1, 10, 100, 1000],
            'svc__kernel': ['rbf', 'linear']
        }
    },
    'random_forest': {
        'model': RandomForestClassifier(),
        'params': {
            'randomforestclassifier__n_estimators': [1, 5, 10]
        }
    },
    'logistic_regression': {
        'model': LogisticRegression(solver='liblinear', multi_class='auto'),
        'params': {
            'logisticregression__C': [1, 5, 10]
        }
    }
}
```
저는 SVM, Random_Forest, Logestic regression 을 hyperparameter를 변경하며 시험해보았습니다.

from flask import Flask, jsonify, request
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)

app.logger.debug('디버깅 메시지')

# 예제 데이터: 학생들의 MBTI 유형과 추가 선호도 정보
data = {
    '학생1': {'MBTI': 'INTJ', '선호도': [0.1, 0.2, 0.3]},
    '학생2': {'MBTI': 'INTP', '선호도': [0.1, 0.2, 0.2]},
    '학생3': {'MBTI': 'ENTJ', '선호도': [0.2, 0.2, 0.4]},
    '학생4': {'MBTI': 'INFJ', '선호도': [0.3, 0.4, 0.5]},
    '학생5': {'MBTI': 'ENFP', '선호도': [0.3, 0.3, 0.3]}
}

# 유사도 계산 로직
def calculate_similarity(student_a, student_b):
    mbti_types = ['INTJ', 'INTP', 'ENTJ', 'INFJ', 'ENFP']
    mbti_similarity = {
        (x, y): 1 if x == y else 0.5 if x[0] == y[0] or x[-1] == y[-1] else 0
        for x in mbti_types for y in mbti_types
    }
    mbti_score = mbti_similarity[(student_a['MBTI'], student_b['MBTI'])]
    preference_score = cosine_similarity([np.array(student_a['선호도'])], [np.array(student_b['선호도'])])[0][0]
    return 0.5 * mbti_score + 0.5 * preference_score

@app.route('/similarity', methods=['GET', 'POST'])
def get_similarity():
    if request.method == 'POST':
        # 요청 본문에서 사용자의 MBTI와 선호도를 받아옴
        user_info = request.json
        user_mbti = user_info['MBTI']
        user_preference = np.array(user_info['선호도'])

        # 사용자와 가장 유사한 학생을 찾음
        most_similar_student = None
        highest_similarity = -1
        for student, info in data.items():
            similarity = calculate_similarity(
                {'MBTI': user_mbti, '선호도': user_preference},
                info
            )
            if similarity > highest_similarity:
                most_similar_student = student
                highest_similarity = similarity

        # 가장 유사한 학생의 정보를 반환
        return jsonify(data[most_similar_student])
    else:
        # 모든 학생들 사이의 유사도 계산
        students = list(data.keys())
        similarity_matrix = np.zeros((len(students), len(students)))

        for i, student_a in enumerate(students):
            for j, student_b in enumerate(students):
                if i != j:
                    similarity_matrix[i][j] = calculate_similarity(data[student_a], data[student_b])

        return jsonify(similarity_matrix.tolist())  # numpy 배열을 JSON 형태로 변환

if __name__ == '__main__':
    app.run(debug=True)

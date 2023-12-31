import { useEffect,useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { baseUrl } from "../share"; 
import CreateQuestion from "../compotents/CreateQuestion";

export default function Exam(props) {

    const { cohortId, examId } = useParams();
    const navigate = useNavigate();
    const [exam, setExam] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [message, setMessage] = useState('');
    const [score, setScore] = useState(null);
    const [isCreator, setIsCreator] = useState(false);

    //isCreator Check
    useEffect(() => {
        const url = baseUrl + 'api/cohorts/'+ cohortId +'/';
        fetch(url,
                {
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('access')}`,
                    }
                }
            )
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
                return response.json();
            })
            .then((data) => {
                if (data.cohort.cohort_creator.user_id === parseInt(localStorage.getItem('user')))
                    setIsCreator(true);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [cohortId]);
    //isCreator Check End

    //Exam info Fetch
    useEffect(() => {
        const url = baseUrl + 'api/exams/'+ examId +'/';
        fetch(url,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access')}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
                return response.json();
            })
            .then((data) => {
                setExam(data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [examId])
    //Exam info Fetch End

    //Questions for exam Fetch
    useEffect(() => {
        const url = baseUrl + 'api/exam/'+ examId+'/questions/';
        fetch(url,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access')}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
                return response.json();
            })
            .then((data) => {
                setQuestions(data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [examId]);
    //Questions for exam Fetch End


    function attendedExam() {
        const urlAttended = baseUrl + 'api/exams/' + examId + '/attended/';
        const userID = localStorage.getItem('user');
        fetch(urlAttended, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access')}`,
            },
            body: JSON.stringify({
                exam: examId,
                user: userID,
            })
        })
            .then(response => {
                //All errors
                if (!response.ok) {
                    if (response.status === 400) {
                        setMessage('You have already attended this exam.');
                    } else {
                        throw new Error('Something went wrong');
                    }
                }
                response.json()
            })
            .then(data => {
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    
    function markExam() {
        const url = baseUrl + 'api/exams/'+ examId+'/attended/';
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                // Include your authentication headers, if any
                Authorization: `Bearer ${localStorage.getItem('access')}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.score);  // Log the updated Attended instance
                setScore(data.score);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    const handleOptionChange = (questionId, selectedOption) => {
        setSelectedOptions(prevOptions => ({
            ...prevOptions,
            [questionId]: selectedOption
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const url = baseUrl + 'api/answer/mcq/';
        const userId = localStorage.getItem('user');
        const answers = Object.entries(selectedOptions).map(([mcq, selected_option]) => ({
            mcq,
            user: userId,
            selected_option,
        }));

        // Create an array to hold the fetch Promises
        const fetchPromises = answers.map((answer) => {
            return fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                },
                body: JSON.stringify(answer),
            });
        });

        // Add the attendedExam fetch Promise to the array
        fetchPromises.push(attendedExam());

        // Wait for all the fetch Promises to resolve before calling markExam
        Promise.all(fetchPromises).then(() => {
            markExam();
        });
    };

    const addQuestion = (question, option1, option2, option3, option4, answer, marks) => {
       const url = baseUrl + 'api/exam/'+examId+'/questions/';
       fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access')}`,
              },
              body: JSON.stringify({
                exam: examId,
                question: question,
                option1: option1,
                option2: option2,
                option3: option3,
                option4: option4,
                answer: answer,
                marks: marks,
              }),
         })
              .then(response => {
                if (!response.ok) {
                     throw new Error('Something went wrong');
                }
                return response.json();
              })
              .then(data => {
                setQuestions([...questions, data]);
                window.location.reload();
              })
              .catch((e) => {
                console.log(e);
              });
    }

    const handleDelete = (questionId) => {
        const url = baseUrl + 'api/questions/' + questionId + '/';
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access')}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error deleting question: ${response.statusText}`);
                }
                // Only try to parse the response as JSON if there's content
                return response.status === 204 ? null : response.json();
            })
            .then(data => {
                console.log(data);
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error deleting question:', error);
            });
    }


    return (
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Exam</h1>
            <h2 className="text-2xl mb-2">{exam?.exam_name}</h2>
            {isCreator &&
            <>
                <CreateQuestion addQuestion={addQuestion} />
                <div className="flex justify-end">
                    <button onClick={() => navigate('/cohort/'+cohortId+'/exam/'+examId+'/delete')}
                        className="bg-red-700 text-white mb-2 px-2 py-1 rounded"        
                    >
                        Delete Exam
                    </button>
                   
                </div>
            </>
            }
            <form
                onSubmit={handleSubmit}
            >   
                <ul className="space-y-4">
                    {questions.map((question) => (
                        <li key={question.id} className="border p-4 rounded-md">
                            {isCreator &&
                            <div className="flex justify-end">
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => handleDelete(question.id)}
                                >
                                    Delete
                                </button>
                            </div>}
                            <h3 className="text-lg font-semibold mb-2">{question.question}</h3>
                            <div className="flex flex-row space-x-4 space-y-2">
                                {['option1', 'option2', 'option3', 'option4'].map(option => (
                                    <label key={option} className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            className="form-radio text-blue-500"
                                            name={`question-${question.id}`}
                                            value={option}
                                            onChange={() => handleOptionChange(question.id, question[option])}
                                        />
                                        <span className="ml-2">{question[option]}</span>
                                    </label>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
                <button
                    type="submit"
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Submit
                </button>
            </form>
            {message && <p className="text-red-500">{message}</p>}
            {score &&
            <div className="mx-auto bg-green-300 text-white font-bold rounded w-1/2">
                <p className="text-lg text-center py-4">Your Score is: {score}</p>
            </div>}
        </div>
    )
}
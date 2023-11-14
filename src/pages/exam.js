import { useEffect,useState } from "react";
import { useParams } from "react-router-dom"
import { baseUrl } from "../share"; 

export default function Exam(props) {

    const [exam, setExam] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});

    const { id } = useParams();

    useEffect(() => {
        const url = baseUrl + 'api/exams/'+ id +'/';
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
                console.log(data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [id])
    
    useEffect(() => {
        const url = baseUrl + 'api/exam/'+ id+'/questions/';
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
                console.log(data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [id]);


   

        const handleOptionChange = (questionId, selectedOption) => {
            setSelectedOptions(prevOptions => ({
                ...prevOptions,
                [questionId]: selectedOption
            }));
        };

        const handleSubmit = (event) => {
            event.preventDefault();
        
            const url = baseUrl + 'api/answer/mcq/';
        
            // Assuming the user ID is stored in local storage
            const userId = localStorage.getItem('user');
        
            // Convert selectedOptions to an array of answers
            const answers = Object.entries(selectedOptions).map(([mcq, selected_option]) => ({
                mcq,
                user: userId,
                selected_option,
            }));
        
            // Send each answer to the server
            answers.forEach((answer) => {
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // Include the access token in the Authorization header if needed
                        'Authorization': `Bearer ${localStorage.getItem('access')}`,
                    },
                    body: JSON.stringify(answer),
                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Something went wrong');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('Answer submitted:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            });
        };


    return (
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Exam</h1>
            <h2 className="text-2xl mb-2">{exam?.exam_name}</h2>
            <form
                onSubmit={handleSubmit}
            >   
                <ul className="space-y-4">
                    {questions.map((question) => (
                        <li key={question.id} className="border p-4 rounded-md">
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
        </div>
    )
}
import { useState, useEffect } from 'react';
import { Link, useParams,useNavigate } from 'react-router-dom';
import { baseUrl } from '../share';
import CreateExam from '../compotents/CreateExam';

export default function Cohort(props) {
    const { id } = useParams();
    const [cohort, setCohort] = useState(null);
    const [exams, setExams] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const url = baseUrl + 'api/cohorts/'+ id +'/';
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
                setCohort(data.cohort);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [id]);

    useEffect(() => {
        const url = baseUrl + 'api/exam/cohort/'+ id +'/';
        fetch(url,
            {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access')}`,
                }
            }           
            )
            .then((res) => {
            if(res.status === 401)
                navigate('/login');
            else
                return res.json()
            })
            .then((data) => {
                setExams(data);
            })
    }, [id, navigate]);

    function createExam(examName) {
        console.log(examName);
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
            <div className="w-full lg:w-1/5 bg-white shadow-lg">
                <div className="p-4">
                    <div className="flex justify-between items-center">
                        <Link to={'/people/' + id} className="text-gray-900 font-bold text-xl">People</Link>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-4/5">
                <nav className="bg-white shadow-lg">
                    <div className="p-4">
                        <div className="flex justify-between items-center">
                            <h1 className="text-3xl font-bold text-gray-900">{cohort && cohort.cohort_name}</h1>
                        </div>
                    </div>
                </nav>
                <div className="p-4">
                    {cohort && (
                        <div>
                            <p className="text-gray-700">Cohort ID: {cohort.id}</p>
                        </div>
                    )}
                </div>
                <div className="flex justify-center mt-8">
                    <CreateExam createExam={createExam} />
                </div>
                <div className="flex justify-center mt-8">
                    {exams.length === 0 ? (
                        <p>Loading...</p> // You can replace this with a loading spinner if desired
                    ) : (
                        <div className="flex flex-col items-center mt-8">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">Exams</h1>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {exams.map((exam) => (
                                    <div className="bg-white rounded-lg shadow-lg p-4" key={exam.id}>
                                       <Link to={`/exam/${exam.id}`}> <p>{exam.exam_name}</p></Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
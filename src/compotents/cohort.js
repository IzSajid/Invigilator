import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Cohort(props) {
    const { id } = useParams();
    const [cohort, setCohort] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/api/cohorts/${id}/`)
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

    return (
        <div>
            {cohort && (
                <div>
                    <h1>{cohort.cohort_name}</h1>
                    <p>Created by: {cohort.cohort_creator.username}</p>
                </div>
            )}
        </div>
    );
}
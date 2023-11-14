import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

export default function CreateExam(props) {
    const[exam,setExam]= useState('');



    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button onClick={handleShow} className="block mx-auto m-2 px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
                Open a new</button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Exam information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form 
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleClose();
                        setExam('');
                        props.createExam(exam);
                    }}

                        id="editmodal" className="w-full max-w-sm">

                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="course">
                                    Exam
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                id="course" type="text"
                                    value={exam}
                                    onChange={(e) => { setExam(e.target.value) }}
                                />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className='bg-gray-300 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded' onClick={handleClose}>
                        Close
                    </button>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' form='editmodal'>
                        Create
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
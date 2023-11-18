import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

export default function CreateQuestion(props) {
    const[question,setQuestion]= useState('');
    const[option1,setOption1]= useState('');
    const[option2,setOption2]= useState('');
    const[option3,setOption3]= useState('');
    const[option4,setOption4]= useState('');
    const[answer,setAnswer]= useState('');
    const[marks,setMarks]= useState(1);
    const [selectedOptionValue, setSelectedOptionValue] = useState('one');


    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button onClick={handleShow} 
            className="block mx-auto m-2 px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
                Add a question</button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>New question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form 
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleClose();
                        setQuestion('');
                        setOption1('');
                        setOption2('');
                        setOption3('');
                        setOption4('');
                        setAnswer('');
                        setMarks(1);
                        props.addQuestion(question,option1,option2,option3,option4,answer,marks);
                        console.log(question,option1,option2,option3,option4,answer,marks);
                     }}
                        id="editmodal" className="w-full max-w-sm">

                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" 
                                htmlFor="question">
                                    Question
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                id="question" type="text"
                                    value={question}
                                    onChange={(e) => { setQuestion(e.target.value) }}
                                />
                            </div>
                        </div>
                       <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                    htmlFor="one">
                                    Option 1
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="one" type="text"
                                    value={option1}
                                    onChange={(e) => { setOption1(e.target.value) }}
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" 
                                htmlFor="two">
                                    Option 2
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                id="two" type="text"
                                    value={option2}
                                    onChange={(e) => { setOption2(e.target.value) }}
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" 
                                htmlFor="three">
                                    Option 3
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                id="three" type="text"
                                    value={option3}
                                    onChange={(e) => { setOption3(e.target.value) }}
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" 
                                htmlFor="four">
                                    Option 4
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                id="four" type="text"
                                    value={option4}
                                    onChange={(e) => { setOption4(e.target.value) }}
                                />
                            </div>
                        </div>
                        <div className="md:w-2/3">
                            <select
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                                id="answer"
                                type="text"
                                value={selectedOptionValue} // Use selectedOptionValue instead of answer
                                onChange={(e) => {
                                    const selectedOption = e.target.options[e.target.selectedIndex];
                                    const optionValues = {
                                        one: option1,
                                        two: option2,
                                        three: option3,
                                        four: option4,
                                    };
                                    setAnswer(optionValues[selectedOption.value]);
                                    setSelectedOptionValue(selectedOption.value); // Update selectedOptionValue
                                }}
                            >
                                <option value="one">Option 1</option>
                                <option value="two">Option 2</option>
                                <option value="three">Option 3</option>
                                <option value="four">Option 4</option>
                            </select>
                        </div>    
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" 
                                htmlFor="marks">
                                    Marks
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                id="marks" type="number"
                                    value={marks}
                                    onChange={(e) => { setMarks(e.target.value) }}
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
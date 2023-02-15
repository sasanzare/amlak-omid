import { Form } from 'react-bootstrap';
function SingleSelect({ val, title, name, myClass, onChange }) {
    return (
        <Form.Group className={"SingleSelect mb-3 " + myClass} >
            <Form.Select onChange={onChange} name={name} className='border-0 shadow-es'>
                <option  value=''>{title} - (انتخاب نشده)</option>
                {val.map((value, index) => {
                    if (typeof value == 'object')
                        return <option key={index} value={value.val}>{value.title}</option>
                    else
                        return <option key={index} value={value}>{value}</option>
                })
                }
            </Form.Select>
        </Form.Group>
    );
}

export default SingleSelect;
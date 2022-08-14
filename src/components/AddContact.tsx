import {UserOutlined} from '@ant-design/icons';
import {Form, Modal, Input, Button} from 'antd';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {selectContactStatus} from "../slices/contact/contactSlice";
import {addContact} from "../slices/contact/contactApi";
import {useDispatch} from "react-redux";


type AddFormValues = {
    name: string;
    phone: string;
};

type Props = {
    isAddFormVisible: boolean;
    hideAddForm: () => void;
};

export const AddContact = ({isAddFormVisible, hideAddForm}: Props) => {
    const status = useTypedSelector(selectContactStatus);
    const dispatch = useDispatch();

    const onFinish = async ({name, phone}: AddFormValues) => {
        await dispatch(addContact({name, phone}));
        hideAddForm();
    };

    return (
        <Modal
            title='Добавление контакта'
            visible={isAddFormVisible}
            onCancel={hideAddForm}
            width={400}
            centered
            footer={null}
        >
            <Form initialValues={{name:'', phone:''}} onFinish={onFinish}>
                <Form.Item
                    name='name'
                    rules={[
                        {required:true, message:'Пожалуйста введите имя контакта'},
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className='site-form-item-icon'/>}
                        placeholder='Название контакта'
                    />
                </Form.Item>

                <Form.Item
                    name='phone'
                    rules={[
                        {required:true, message:'Пожалуйста введите номер телефона'},
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className='site-form-item-icon'/>}
                        placeholder='Номер телефона'
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        loading={status === 'loading'}
                        type='primary'
                        htmlType='submit'
                        style={{width:'100%'}}
                    >
                        Добавить
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

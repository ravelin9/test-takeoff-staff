import {UserOutlined} from '@ant-design/icons';
import {Form, Modal, Input, Button} from 'antd';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {selectContactStatus} from "../slices/contact/contactSlice";
import {useDispatch} from "react-redux";
import {ContactItem, editContact} from "../slices/contact/contactApi";


type EditFormValues = {
    name: string;
    phone: string;
};

type Props = {
    isEditFormVisible: boolean;
    hideEditForm: () => void;
    selectedContact: ContactItem | null;
};

export const EditContact = ({
                                isEditFormVisible,
                                hideEditForm,
                                selectedContact,
                            }: Props) => {
    const status = useTypedSelector(selectContactStatus);
    const dispatch = useDispatch();

    const onFinish = async ({name, phone}: EditFormValues) => {
        if (!selectedContact) return;

        await dispatch(editContact({...selectedContact, name, phone}));
        hideEditForm();
    };

    return (
        <Modal
            title='Редактирование контакта'
            visible={isEditFormVisible}
            onCancel={hideEditForm}
            width={400}
            centered
            footer={null}
        >
            <Form
                initialValues={{
                    name:selectedContact?.name,
                    phone:selectedContact?.phone,
                }}
                onFinish={onFinish}
            >
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
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

import React, {ChangeEventHandler, FC, useEffect} from 'react';
import {Avatar, Button, List, Input} from "antd";
import {deleteContact, fetchContacts} from "../slices/contact/contactApi";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {selectContactList, selectContactStatus} from "../slices/contact/contactSlice";

const { Search } = Input


const ContactsPage: FC = () => {

    const contactList = useTypedSelector(selectContactList);
    const dispatch = useDispatch()
    const status = useTypedSelector(selectContactStatus)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    }
    const handleDeletion = (id: string) => {
                dispatch(deleteContact(id));
    };

    useEffect(() => {
        dispatch(fetchContacts())
    }, [dispatch])

    return (
        <div>
            <Search placeholder="Поиск" onChange={handleChange} enterButton />
        <List
            bordered
            className="contactList"
            itemLayout="horizontal"
            dataSource={contactList}
            loading={status === 'loading'}
            renderItem={contact => (
                <List.Item actions={[
                    <Button key="list-loadmore-edit">Изменить</Button>,
                    <Button onClick={() => handleDeletion(contact.id)} key="list-loadmore-more" danger>Удалить</Button>]}>
                    <List.Item.Meta
                        avatar={<Avatar src={contact.avatar}/>}
                        title={contact.name}
                        description={contact.phone}
                    />
                </List.Item>
            )}></List>
            <Button type="primary" className="addBtn">Новый контакт</Button>
        </div>
        );
};

export default ContactsPage;
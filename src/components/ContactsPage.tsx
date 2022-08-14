import React, {ChangeEventHandler, FC, useEffect} from 'react';
import {Avatar, Button, List, Input} from "antd";
import {fetchContacts} from "../slices/contact/contactApi";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {selectContactList} from "../slices/contact/contactSlice";

const { Search } = Input


const ContactsPage: FC = () => {

    const contactList = useTypedSelector(selectContactList);
    const dispatch = useDispatch()
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    }


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
            renderItem={item => (
                <List.Item actions={[<Button key="list-loadmore-edit">Изменить</Button>, <Button key="list-loadmore-more" danger>Удалить</Button>]}>
                    <List.Item.Meta
                        avatar={<Avatar src={item.avatar}/>}
                        title={item.name}
                        description={item.phone}
                    />
                </List.Item>
            )}></List>
            <Button type="primary" className="addBtn">Новый контакт</Button>
        </div>
        );
};

export default ContactsPage;
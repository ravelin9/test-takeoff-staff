import React, {FC, useEffect, useState} from 'react';
import {Avatar, Button, List} from "antd";
import {CONTACTS_URL} from "../shared/constants";

type ContactItem = {
    id: string
    name: string;
    phone: string;
    avatar: string;
}

const ContactsPage: FC = () => {

    const [contactList, setContactList] = useState<ContactItem[]>([]);

    useEffect(() => {
        fetch(CONTACTS_URL)
            .then(res => res.json())
            .then(res => setContactList(res))
    }, [])

    return (
        <div>
        <List
            bordered
            className="contactList"
            itemLayout="horizontal"
            dataSource={contactList}
            renderItem={item => (
                <List.Item actions={[<a key="list-loadmore-edit">Изменить</a>, <a key="list-loadmore-more">Удалить</a>]}>
                    <List.Item.Meta
                        avatar={<Avatar src={item.avatar}/>}
                        title={item.name}
                        description={item.phone}
                    />
                </List.Item>
            )}
        />
            <Button type="primary" className="addBtn">Новый контакт</Button>
        </div>
        );
};

export default ContactsPage;
import React, {FC, useEffect, useState} from 'react';
import {Avatar, Button, List} from "antd";
import {ContactItem, deleteContact, fetchContacts} from "../slices/contact/contactApi";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {selectContactList, selectContactStatus} from "../slices/contact/contactSlice";
import {AddContact} from "./AddContact";
import {EditContact} from "./EditContact";
import {SearchForm} from "./Search";


const ContactsPage: FC = () => {

    const [isAddFormVisible, setIsAddFormVisible] = useState(false);
    const showAddForm = () => setIsAddFormVisible(true);
    const hideAddForm = () => setIsAddFormVisible(false);

    const [isEditFormVisible, setIsEditFormVisible] = useState(false);
    const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null)
    const contactList = useTypedSelector(selectContactList);
    const [filteredList, setFiltered] = useState<ContactItem[]>(contactList);
    const [isFiltering, setIsFiltering] = useState(false);

    const showEditForm = (contactItem: ContactItem) => {
        setIsEditFormVisible(true);
        setSelectedContact(contactItem)
    }
    const hideEditForm = () => setIsEditFormVisible(false);


    const dispatch = useDispatch()
    const status = useTypedSelector(selectContactStatus)
    const handleDeletion = (id: string) => {
        dispatch(deleteContact(id));
    };

    useEffect(() => {
        dispatch(fetchContacts())
    }, [dispatch])

    return (
        <div>
            <SearchForm setFiltered={setFiltered} setIsFiltering={setIsFiltering}/>
            <List
                bordered
                className="contactList"
                itemLayout="horizontal"
                dataSource={filteredList.length ? filteredList : contactList}
                loading={status === 'loading'}
                renderItem={contact => (
                    <List.Item actions={[
                        <Button
                            onClick={() => showEditForm(contact)}
                            key="list-loadmore-edit">
                            Редактировать
                        </Button>,
                        <Button onClick={() => handleDeletion(contact.id)}
                                key="list-loadmore-more"
                                danger
                        >
                            Удалить
                        </Button>]}>
                        <List.Item.Meta
                            avatar={<Avatar src={contact.avatar}/>}
                            title={contact.name}
                            description={contact.phone}
                        />
                    </List.Item>
                )}></List>
            <Button
                onClick={showAddForm}
                type="primary"
                className="addBtn"
            >
                Новый контакт
            </Button>
            {isAddFormVisible && (
                <AddContact
                    isAddFormVisible={isAddFormVisible}
                    hideAddForm={hideAddForm}/>)}
            {isEditFormVisible && (
                <EditContact
                    isEditFormVisible={isEditFormVisible}
                    hideEditForm={hideEditForm}
                    selectedContact={selectedContact}
                />
            )}

        </div>
    );
};

export default ContactsPage;
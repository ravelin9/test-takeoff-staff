import React, {FC} from 'react';
import ContactsPage from "../components/ContactsPage";
import {Layout, Row} from "antd";

const Contacts: FC = () => {
    return (
        <Layout>
            <Row justify="center" align="middle">
                <ContactsPage/>
            </Row>
        </Layout>
    );
};

export default Contacts;
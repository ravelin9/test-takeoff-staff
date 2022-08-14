import React, {FC, useState} from 'react';
import {Button, Form, Input} from "antd";
import {rules} from "../utils/rule";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";

const LoginForm: FC = () => {
    const {error, isLoading} = useTypedSelector(state => state.auth);
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const {login} = useActions()
    const submit = () => {
        login(username, password)
    }
    return (
        <Form
            onFinish={submit}
        >
            {error && <div style={{color:'red'}}>
                {error}
            </div>}
            <Form.Item
                label="Имя пользователя"
                name="username"
                rules={[rules.required('Пожалуйста введите имя пользователя')]}
            >
                <Input
                    value={username}
                    onChange={e => setUserName(e.target.value)}
                />
            </Form.Item>
            <Form.Item
                label="Пароль"
                name="password"
                rules={[rules.required('Введите пароль')]}
            >
                <Input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type={"password"}
                />
            </Form.Item>
            <Form.Item wrapperCol={{offset:8, span:16}}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
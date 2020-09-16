import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { Alert, Checkbox } from 'antd';
import React, { useState } from 'react';
import { Link, connect, Dispatch } from 'umi';
import { StateType } from '@/models/login';
import { LoginParamsType } from '@/services/login';
import { ConnectState } from '@/models/connect';
import LoginForm from './components/Login';

import styles from './style.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginForm;
interface LoginProps {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState<string>('account');

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, type },
    });
  };
  return (
    <div className={styles.main}>
      <LoginForm activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <Tab key="account" tab="Login com usuário e senha">
          {status === 'error' && loginType === 'account' && !submitting && (
            <LoginMessage content="Conta ou senha incorreta（admin/ant.design）OU （seller/ant.design）" />
          )}

          <UserName
            name="userName"
            placeholder="Usuário: admin ou seller"
            rules={[
              {
                required: true,
                message: 'Por favor, insira o nome de usuário',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="Senha: ant.design"
            rules={[
              {
                required: true,
                message: 'Por favor insira a senha！',
              },
            ]}
          />
        </Tab>
        <Tab key="mobile" tab="">
          {status === 'error' && loginType === 'mobile' && !submitting && (
            <LoginMessage content="Erro de código de verificação" />
          )}
          <Mobile
            name="mobile"
            placeholder="número de telefone"
            rules={[
              {
                required: true,
                message: 'Por favor insira o número do telefone！',
              },
              {
                pattern: /^1\d{10}$/,
                message: 'Número do telefone incorreto!',
              },
            ]}
          />
          <Captcha
            name="captcha"
            placeholder="Código de verificação"
            countDown={120}
            getCaptchaButtonText=""
            getCaptchaSecondText="秒"
            rules={[
              {
                required: true,
                message: 'Por favor insira o código de verificação',
              },
            ]}
          />
        </Tab>
        <div>
          <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
            Login automático
          </Checkbox>
          <a
            style={{
              float: 'right',
            }}
          >
            Esqueceu a senha
          </a>
        </div>
        <Submit loading={submitting}>Conecte-se</Submit>
        <div className={styles.other}>
          Outros métodos de login
          <AlipayCircleOutlined className={styles.icon} />
          <TaobaoCircleOutlined className={styles.icon} />
          <WeiboCircleOutlined className={styles.icon} />
          <Link className={styles.register} to="/user/register">
            Registrar conta
          </Link>
        </div>
      </LoginForm>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);

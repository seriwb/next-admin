import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text } from "@react-email/components";
import { APP_NAME } from "@/constants/application";

type Props = {
  name: string;
  email: string;
  password: string;
  loginUrl: string;
};

// 招待メールテンプレート
export const InviteEmail = ({ name, email, password, loginUrl }: Props) => {
  return (
    <Html>
      <Head />
      <Preview>{`[${APP_NAME}]アカウントが作成されました`}</Preview>
      <Body style={{ backgroundColor: "#fff", fontFamily: "sans-serif" }}>
        <Container style={{ maxWidth: "600px", margin: "0 auto", padding: "40px 20px" }}>
          <Heading style={{ fontSize: "24px", color: "#333" }}>アカウントが作成されました</Heading>
          <Text style={{ color: "#555" }}>
            {name ? `${name} 様` : ""}
            <br />
            管理者により{APP_NAME}のアカウントが作成されました。以下の情報でログインしてください。
          </Text>
          <Section
            style={{
              backgroundColor: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              padding: "20px",
              margin: "20px 0",
            }}
          >
            <Text style={{ margin: "4px 0", color: "#333" }}>
              <strong>メールアドレス:</strong> {email}
            </Text>
            <Text style={{ margin: "4px 0", color: "#333" }}>
              <strong>パスワード:</strong> {password}
            </Text>
          </Section>
          <Button
            href={loginUrl}
            style={{
              backgroundColor: "#0070f3",
              color: "#fff",
              borderRadius: "6px",
              padding: "12px 24px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            ログインする
          </Button>
          <Text style={{ color: "#999", fontSize: "12px", marginTop: "32px" }}>
            このメールに心当たりがない場合は、無視してください。
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

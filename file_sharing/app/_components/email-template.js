import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";




export const EmailTemplate = ({
  res
}) => (
  <Html>
      <Head />
      <Preview>File-share</Preview>
      <Body style={main}>
        <Container>
          

          <Section style={content}>

            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Hi { res?.emailToSend?.split("@")[0] },
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {res.userName} shared a file with you.
                </Heading>

                <Text style={paragraph}>
                  <b>File Name: { res.fileName } </b>
                  {/* {formattedDate} */}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>File Size: { res.fileSize } </b>
                  {/* {loginDevice} */}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>File Type: { res.fileType } </b>
                  {/* {loginLocation} */}
                </Text>
                <Text
                  style={{
                    color: "rgb(0,0,0, 0.5)",
                    fontSize: 14,
                    marginTop: -5,
                  }}
                >
                  *Access and Download file on your own risk
                  {/* {loginIp} */}
                </Text>

                <Text style={paragraph}>
                  You can also use to File-share to share files.
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  Click Button to Access your file
                </Text>
              </Column>
            </Row>
            <Row style={{ ...boxInfos, paddingTop: "0" }}>
              <Column style={containerButton} colSpan={2}>
                <Button style={button}
                href={res?.shortUrl}
                >
                  Click here to Download
                  </Button>
              </Column>
            </Row>
          </Section>

          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgb(0,0,0, 0.7)",
            }}
          >
            © 2022 | File-Sharing Project @Niteesh Kulhari
            U.S.A. | www.test.com
          </Text>
        </Container>
      </Body>
    </Html>
);

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: "30px 20px",
};



const containerButton = {
  display: "flex",
  justifyContent: "center",  // Center the button horizontally
  alignItems: "center",      // Align items vertically in the center
  width: "100%",             // Ensure full width for the container
  textAlign: "center",       // Center the text inside the container
  padding: "10px 0",         // Optional: Adjust padding
};

const button = {
  backgroundColor: "#e00707",
  borderRadius: 3,
  color: "#FFF",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",
  cursor: "pointer",
  padding: "12px 30px",
  textAlign: "center",  // Center the button text
  display: "block",     // Ensure the button behaves as a block-level element
  margin: "0 auto",     // This ensures the button is centered within the container
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",      // Centers the content horizontally
  justifyContent: "center",  // Centers the content vertically
  padding: "20px",
  textAlign: "center",       // Ensures text is centered as well
};



const image = {
  maxWidth: "100%",
};

const boxInfos = {
  padding: "20px",
};

const containerImageFooter = {
  padding: "45px 0 0 0",
};

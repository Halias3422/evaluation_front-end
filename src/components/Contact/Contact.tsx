import { copse, roboto } from "@/styles/fonts";
import styled from "styled-components";

const Contact = () => {
  return (
    <FormContainer id="contactPage" className="pageContainer">
      <section className="pageContentWrapper">
        <ContactForm
          name="contact"
          method="POST"
          data-netlify="true"
          className={`mainTheme ${roboto.className}`}
        >
          <FormItem>
            <label htmlFor="nameInput">Votre nom:</label>
            <input
              className={roboto.className}
              id="nameInput"
              name="nameInput"
              type="text"
              required
            />
          </FormItem>
          <FormItem>
            <label htmlFor="mailInput">Votre adresse mail:</label>
            <input
              className={roboto.className}
              type="email"
              id="mailInput"
              name="mailInput"
              required
            />
          </FormItem>
          <FormItem>
            <label htmlFor="phoneInput">
              Votre numéro de téléphone (optionnel):
            </label>
            <input
              className={roboto.className}
              type="tel"
              id="phoneInput"
              name="phoneInput"
            />
          </FormItem>
          <FormItem>
            <label htmlFor="objectInput">Objet du contact:</label>
            <input
              className={roboto.className}
              type="text"
              id="objectInput"
              name="objectInput"
            />
          </FormItem>
          <FormItem>
            <label htmlFor="requestInput">Message:</label>
            <textarea
              className={roboto.className}
              id="requestInput"
              name="requestInput"
              rows={25}
              required
            />
          </FormItem>
          <SubmitButton className={copse.className} type="submit">
            Envoyer
          </SubmitButton>
        </ContactForm>
      </section>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  display: flex;
  margin-top: 4%;
`;

const ContactForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  input,
  textarea {
    background-color: ${(props) => props.theme.white};
    font-size: 16px;
  }
  @media screen and (min-width: 1024px) {
    label,
    input,
    textarea {
      font-size: 18px;
    }
    max-width: 800px;
  }
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SubmitButton = styled.button`
  width: fit-content;
  padding: 10px 50px;
  margin: 0 auto;
  font-size: 22px;
  background-color: ${(props) => props.theme.lightGrey};
  border: ${(props) => `1px solid ${props.theme.white}`};
  border-radius: 4px;
  color: ${(props) => props.theme.white};
`;

export default Contact;

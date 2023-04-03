import { copse, roboto } from "@/styles/fonts";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import PageContext from "@/context/pageContext";
import { pageAnimationsHandler } from "@/lib/pageAnimationsHandler";

const Contact = () => {
  const { pageContext } = useContext(PageContext);
  const [formSubmit, setFormSubmit] = useState<string>("");

  const handleFormSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFormSubmit("Merci, votre demande a bien été transmise !");
  };

  useEffect(() => {
    const contactContainer = document.getElementById("contactPage");
    if (contactContainer) {
      pageAnimationsHandler(contactContainer);
    }
  }, []);

  useEffect(() => {
    setFormSubmit("");
  }, [pageContext.currentPath]);

  return (
    <div
      id="contactPage"
      className="pageContainer"
      onSubmit={(e) => handleFormSubmit(e)}
    >
      <section className="pageContentWrapper">
        {formSubmit.length === 0 ? (
          <ContactForm
            name="contact"
            method="POST"
            data-netlify="true"
            className={`mainTheme ${roboto.className}`}
          >
            <input type="hidden" name="form-name" value="contact" />
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
            <SubmitButton
              className={`objectHoverEffect ${copse.className}`}
              type="submit"
            >
              Envoyer
            </SubmitButton>
          </ContactForm>
        ) : (
          <SubmitContainer>
            <h2 className={`mainTheme ${roboto.className}`}>{formSubmit}</h2>
            <MailImage
              src="/mail-sent.webp"
              alt="demande envoyée"
              width="640"
              height="373"
            />
          </SubmitContainer>
        )}
      </section>
    </div>
  );
};

const SubmitContainer = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
`;

const MailImage = styled(Image)`
  max-width: 100%;
  height: auto;
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
    border: ${(props) => `1px solid ${props.theme.lightGrey}`};
    border-radius: 4px;
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
  cursor: pointer;
`;

export default Contact;

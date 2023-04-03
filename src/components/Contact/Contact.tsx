import { copse, roboto } from "@/styles/fonts";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import PageContext from "@/context/pageContext";
import { pageAnimationsHandler } from "@/lib/pageAnimationsHandler";
import { ContactForm } from "@/interfaces/contact";

const Contact = () => {
  const { pageContext } = useContext(PageContext);
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    object: "",
    request: "",
  });
  const [formSubmit, setFormSubmit] = useState({
    message: "",
    image: "",
  });

  const encode = (data: any) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const submitStatus = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...formData }),
      });
      if (submitStatus.status !== 200) {
        throw new Error();
      }
      setFormSubmit({
        message: "Merci, votre demande a bien été transmise !",
        image: "/mail-sent.webp",
      });
    } catch (e) {
      setFormSubmit({
        message:
          "Une erreur a eu lieu lors de l'envoi, merci de réessayer plus tard.",
        image: "/mail-error.webp",
      });
    }
  };

  const handleInputChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.currentTarget.id.replace("Input", "")]: e.currentTarget.value,
    });
  };

  useEffect(() => {
    const contactContainer = document.getElementById("contactPage");
    if (contactContainer) {
      pageAnimationsHandler(contactContainer);
    }
  }, []);

  useEffect(() => {
    setFormSubmit({
      message: "",
      image: "",
    });
  }, [pageContext.currentPath]);

  return (
    <div id="contactPage" className="pageContainer">
      <section className="pageContentWrapper">
        {formSubmit.message.length === 0 ? (
          <ContactForm
            name="contact"
            method="POST"
            data-netlify="true"
            className={`mainTheme ${roboto.className}`}
            onSubmit={handleFormSubmit}
          >
            <FormItem>
              <label htmlFor="nameInput">Votre nom:</label>
              <input
                className={roboto.className}
                id="nameInput"
                name="nameInput"
                type="text"
                onChange={handleInputChange}
                required
              />
            </FormItem>
            <FormItem>
              <label htmlFor="emailInput">Votre adresse mail:</label>
              <input
                className={roboto.className}
                type="email"
                id="emailInput"
                name="emailInput"
                onChange={handleInputChange}
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
                onChange={handleInputChange}
              />
            </FormItem>
            <FormItem>
              <label htmlFor="objectInput">Objet du contact:</label>
              <input
                className={roboto.className}
                type="text"
                id="objectInput"
                name="objectInput"
                onChange={handleInputChange}
              />
            </FormItem>
            <FormItem>
              <label htmlFor="requestInput">Message:</label>
              <textarea
                className={roboto.className}
                id="requestInput"
                name="requestInput"
                rows={25}
                onChange={handleInputChange}
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
            <h2 className={`mainTheme ${roboto.className}`}>
              {formSubmit.message}
            </h2>
            <ImageContainer>
              <SubmitImage
                src={formSubmit.image}
                alt="statut de l'envoi"
                fill
              />
            </ImageContainer>
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

const ImageContainer = styled.div`
  position: relative;
  width: 640px;
  max-width: 100%;
  height: auto;
  object-fit: cover;
`;

const SubmitImage = styled(Image)`
  position: static !important;
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

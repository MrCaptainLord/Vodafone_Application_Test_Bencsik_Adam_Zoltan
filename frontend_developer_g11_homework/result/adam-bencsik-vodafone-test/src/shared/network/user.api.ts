import { NewContactFormValues } from "../../views/contact/ContactCreate";
import { SERVER_ADDRESS } from "../common/constants";
import { ContactType } from "../common/types";

export const listContacts = async (
  pageSize = 9,
  page = 1,
  headerParam = ""
) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-type": "application/json" },
  };
  const response = await fetch(
    `${SERVER_ADDRESS}/?results=${pageSize}&page=${page}&search=${headerParam}`,
    requestOptions
  );
  return response.json();
};

// The getbyid, create. modify and delete endpoints will not work fully since randomuser.me doesnt provide the
// necessary backend endpoints.
// Because of this the frontend endpoints has been implemented, a way it can be done.

// Sends a request with the contact id as parameter.
export const getContactById = async (id: string) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-type": "application/json" },
  };
  const response = await fetch(`${SERVER_ADDRESS}/?id=${id}`, requestOptions);
  return response.json();
};

// Sends a request with the modified contact entity in the body.
export const modifyContact = async (contact: ContactType) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ ...contact }),
  };
  const response = await fetch(
    `${SERVER_ADDRESS}/contact-modify`,
    requestOptions
  );
  return response.json();
};

// Sends a partial contact entity for creation in the body. The backend needs to fill the remaining data.
export const createContact = async (contactRequest: NewContactFormValues) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ ...contactRequest }),
  };
  const response = await fetch(
    `${SERVER_ADDRESS}/contact-create`,
    requestOptions
  );
  return response.json();
};

// Sends a request for deleteion with a contact entity in the body.
export const deleteContact = async (contact: ContactType) => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ ...contact }),
  };
  const response = await fetch(`${SERVER_ADDRESS}`, requestOptions);
  return response.json();
};

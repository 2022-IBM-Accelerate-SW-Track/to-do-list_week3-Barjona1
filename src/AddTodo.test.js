import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByRole("textbox", {name: /Due Date/i})
  const button = screen.getByRole('button', {name: /Add/i});

  fireEvent.change(inputTask, { target: { value: "History"}});
  fireEvent.change(inputDate, { target: { value: "12/30/2023"}});
  fireEvent.click(button);

  fireEvent.change(inputTask, { target: { value: "task"}});
  fireEvent.change(inputDate, { target: { value: "06/20/2021"}});
  fireEvent.click(button);

  fireEvent.change(inputTask, { target: { value: "task"}});
  fireEvent.change(inputDate, { target: { value: "09/20/2022"}});
  fireEvent.click(button);

  const check = screen.getByText(/History/i);
  expect(check).toBeInTheDocument();
  
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);


 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
 });

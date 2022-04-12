import { useState } from "react"
// This hook recives name and target value in order to change its value and
// returns the onChange method and the whole Form
export const useForm = (initialState = {}) => {
    const [Form, setForm] = useState(initialState);

    const onChange = ({ target }, name) => {
        setForm({
          ...Form,
          [name]: target.value,
        });
      };

      const onReset = () => {
        setForm({})
      }

    return [onChange, Form, onReset]
}
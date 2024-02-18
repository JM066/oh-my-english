import TextFieldInput from '../../components/atoms/TextFieldInput'
import Form from '../../components/molecules/Form'

interface FormData {
  type: string
  email: string
}
function Home(): JSX.Element {
  const onSubmit = (data: FormData) => {
    console.log(data)
  }
  return (
    <div>
      <Form<FormData> onSubmit={onSubmit}>
        <TextFieldInput label='FirstName' formOptions={{ required: true }} />
      </Form>
    </div>
  )
}
export default Home

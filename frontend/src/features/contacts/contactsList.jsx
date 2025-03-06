import { useContext } from "react"
import { ContactsContext } from "../../context/selectedContacts"
import { useSocket } from "../realTimeConnection/socketConnection"


export default function ContactsList() {
    // const {contacts} = useContext(ContactsContext)
    const {contacts} = useSocket()

    console.log('my contacts are :' , contacts)
  return (
    <div>
        <h1>Heeloo</h1>
      
    </div>
  )
}

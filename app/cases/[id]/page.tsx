import Modal from "@/components/Modal";


export default function CaseModal({params: {id}}: {params: {id: string}}) {
    return (
        <Modal>
            <div className="bg-white p-10">
                <h1>Case Page: {id}</h1>
            </div>
        </Modal>
    )
}
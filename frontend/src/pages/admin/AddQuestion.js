import NavigationPanel from "../../components/NavigationPanel";

const AddQuestion = () => {
  return (
    <NavigationPanel
      heading="Panel administratora"
      actions={[
        { label: "Dodaj pytanie zamknięte", path: "/admin/closed/add" },
        { label: "Dodaj pytanie otwarte", path: "/admin/open/add" },
      ]}
    />
  );
};

export default AddQuestion;

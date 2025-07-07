import NavigationPanel from "../../components/NavigationPanel";

const Admin = () => {
  return (
    <NavigationPanel
      heading="Panel administratora"
      actions={[
        { label: "Zarządzaj pytaniami zamkniętymi", path: "/admin/closed" },
        { label: "Zarządzaj pytaniami otwartymi", path: "/admin/open" },
        { label: "Dodaj nowe pytanie", path: "/admin/add" },
      ]}
    />
  );
};

export default Admin;

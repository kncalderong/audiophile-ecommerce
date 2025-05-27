export default function EditProductLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal?: React.ReactNode;
}) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}

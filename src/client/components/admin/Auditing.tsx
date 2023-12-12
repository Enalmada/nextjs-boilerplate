interface Props {
  entity: {
    createdAt: Date;
    createdBy?: string;
    updatedAt: Date;
    updatedBy?: string;
    version: number;
  };
}

const Auditing = (props: Props) => {
  const entity = props.entity;
  return (
    <div className={'text-xs font-thin'}>
      {entity.createdAt && <div>Created {new Date(entity.createdAt).toLocaleString()}</div>}
      {entity.createdAt !== entity.updatedAt && (
        <>
          <div>Updated {new Date(entity.updatedAt).toLocaleString()}</div>
          <div>Version {entity.version}</div>
        </>
      )}
    </div>
  );
};

export default Auditing;

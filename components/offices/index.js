const Offices = ({ offices }) => {
  return (
    <div className="offices">
      {offices.map((office, index) => (
        <div className="office" key={index}>
          <div className="address">{office.address_full}</div>
          <div className="workhours">
            <div
              style={{ whiteSpace: 'pre-line' }}
              dangerouslySetInnerHTML={{ __html: office.work_time }}
            />
          </div>
        </div>
      ))}
      <style jsx>{`
        .office + .office {
          margin-top: 20px;
        }
        .address {
          font-size: 14px;
          font-weight: 400;
          color: black;
        }
        .workhours {
          color: #b4b4b4;
          font-size: 12px;
          margin-top: 4px;
          line-height: 130%;
        }
      `}</style>
    </div>
  )
}

export default Offices

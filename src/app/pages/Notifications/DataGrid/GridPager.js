import React, { useState } from "react";

import { DropDownList } from "@progress/kendo-react-dropdowns";
import ReactPaginate from "react-paginate";

const GridPager = (props) => {
  const [skip, setSkip] = useState(props.skip);
  const [take, setTake] = useState(props.take);
  const totalPages = Math.ceil((props.total || 0) / props.take);

  const handleChange = (e) => {
    setTake(e.value);
    props.onPageChange({
      page: {
        skip: skip,
        take: e.value,
      },
    });
  };

  const handlePageChange = (event) => {
    let skip = event.selected * take;
    setSkip(skip);
    props.onPageChange({
      page: {
        skip: skip,
        take: take,
      },
    });
    console.log(`Page Change: skip ${skip}, take ${take}`);
  };

  return (
    <div className="row justify-content-center justify-content-sm-between align-items-sm-center">
      <div className="col-sm mb-2 mb-sm-0">
        <div className="d-flex justify-content-center justify-content-sm-start align-items-center">
          <span className="mr-2">Showing:</span>
          <DropDownList
            className="select2-custom-pager dropdown-wrapper"
            data={[5, 10, 15, 25, 50]}
            defaultValue={5}
            onChange={handleChange}
            style={{ backgroundColor: "transparent" }}
          />
          <span className="text-secondary mr-2"> of</span> <span>{props.total}</span>
          <span id="datatableWithPaginationInfoTotalQty"></span>
        </div>
      </div>

      <div className="col-sm">
        <div className="d-flex justify-content-center justify-content-sm-end">
          <ReactPaginate
            pageCount={totalPages}
            marginPagesDisplayed={0}
            pageRangeDisplayed={2}
            onPageChange={handlePageChange}
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            activeClassName={"active"}
            previousClassName={"page-item"}
            nextClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
          />
        </div>
      </div>
    </div>
  );
};

export default GridPager;

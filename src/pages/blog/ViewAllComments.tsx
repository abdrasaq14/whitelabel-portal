import React from 'react'
import { Comments } from '../../services/blog.service';
interface AllCommentProps {
 comment: Comments 
}
function ViewAllComments() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-4 xl:grid xl:grid-cols-3 xl:items-start xl:justify-start xl:gap-6">
        {/* {posts.map((blog: BlogPayload, index: number) => (
          <CommentCard
            key={index}
            comment={comment}
            showDeleteIcon={activeTab === "all" ? true : false}
            handleDelete={() => handleDeleteComment(comment._id as string)}
          />
        ))} */}
      </div>

      {/* <Pagination
        total={total}
        limit={limit}
        page={currentPage}
        onPageChange={handlePagination}
        increase={handleNext}
        decrease={handlePrevious}
      /> */}
    </div>
  );
}

export default ViewAllComments
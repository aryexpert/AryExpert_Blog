import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Table, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { set } from "mongoose";

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getcomments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment= async () => {
    setShowModal(false);
    try {
      const res = await fetch( `/api/comment/deleteComment/${commentIdToDelete}`,{
          method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete));
        setShowModal(false);
      } else {
          console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar 
      scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700
      dark:scrollbar-thumb-slate-500"
    >
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Crée</Table.HeadCell>
              <Table.HeadCell>Contenu du commentaire</Table.HeadCell>
              <Table.HeadCell>Nombre de Likes</Table.HeadCell>
              <Table.HeadCell>Post Id</Table.HeadCell>
              <Table.HeadCell>Utilisateur Id</Table.HeadCell>
              <Table.HeadCell>Supprimer</Table.HeadCell>
            </Table.Head>
            {comments.map((comment) => (
              <Table.Body key={comment._id} className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{new Date().toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                      {comment.content}
                  </Table.Cell>
                  <Table.Cell>
                      {comment.numberOfLikes}
                  </Table.Cell>
                  <Table.Cell>{comment.userId}</Table.Cell>
                  <Table.Cell>{comment.postId}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Supprimer
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              className="w-full text-teal-500 text-center text-sm py-7"
              onClick={handleShowMore}
            >
              Afficher plus
            </button>
          )}
        </>
      ) : (
        <p>Vous n'avez aucun commentaire pour le moment !</p>
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Êtes-vous sûr de vouloir supprimer ce commentaire? Cette action sera définitive!
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteComment}>
                Oui, je suis sure!
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                Non, abandonner.
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

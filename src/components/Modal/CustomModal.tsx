import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from '@nextui-org/react';

const CustomModal = ({
  header,
  body,
  size = 'md',
  classNames,
  isOpen,
  onClose,
  onSubmit
}: any) => {

  return (
    <Modal
      size={size}
      isOpen={isOpen}
      onOpenChange={onClose}
      classNames={classNames}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{header}</ModalHeader>
            <ModalBody>{body}</ModalBody>
            <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onSubmit}>
                  Sign in
                </Button>
              </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;

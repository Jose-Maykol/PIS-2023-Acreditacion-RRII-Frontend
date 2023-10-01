import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from '@nextui-org/react';

interface CustomModalProps {
  header: React.ReactNode;
  body: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  classNames?: any;
  isOpen: boolean;
  onClose: () => void;
}

const CustomModal = ({
  header,
  body,
  footer,
  size = 'md',
  classNames,
  isOpen,
  onClose,
}: any) => {

  return (
    <Modal
      size={size}
      isOpen={isOpen}
      onOpenChange={onClose}
      classNames={classNames}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">{header}</ModalHeader>
            <ModalBody>{body}</ModalBody>
            <ModalFooter>{footer}</ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;

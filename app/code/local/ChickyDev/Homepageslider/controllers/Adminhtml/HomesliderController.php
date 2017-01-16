<?php
class ChickyDev_Homepageslider_Adminhtml_HomesliderController extends Mage_Adminhtml_Controller_Action
{

    public function indexAction()
    {
        $this->loadLayout();
        $this->_addContent($this->getLayout()->createBlock('chickydev_homepageslider/adminhtml_slide'));
        $this->renderLayout();
    }

    public function exportCsvAction()
    {
        $fileName = 'Homepage Slider_export.csv';
        $content = $this->getLayout()->createBlock('chickydev_homepageslider/adminhtml_slide_grid')->getCsv();
        $this->_prepareDownloadResponse($fileName, $content);
    }

    public function exportExcelAction()
    {
        $fileName = 'Homepage Slider_export.xml';
        $content = $this->getLayout()->createBlock('chickydev_homepageslider/adminhtml_slide_grid')->getExcel();
        $this->_prepareDownloadResponse($fileName, $content);
    }

    public function massDeleteAction()
    {
        $ids = $this->getRequest()->getParam('ids');
        if (!is_array($ids)) {
            $this->_getSession()->addError($this->__('Please select Homepage Slider(s).'));
        } else {
            try {
                foreach ($ids as $id) {
                    $model = Mage::getSingleton('chickydev_homepageslider/slide')->load($id);
                    $model->delete();
                }

                $this->_getSession()->addSuccess(
                    $this->__('Total of %d record(s) have been deleted.', count($ids))
                );
            } catch (Mage_Core_Exception $e) {
                $this->_getSession()->addError($e->getMessage());
            } catch (Exception $e) {
                $this->_getSession()->addError(
                    Mage::helper('chickydev_homepageslider')->__('An error occurred while mass deleting items. Please review log and try again.')
                );
                Mage::logException($e);
                return;
            }
        }
        $this->_redirect('*/*/index');
    }

    public function editAction()
    {
        $id = $this->getRequest()->getParam('id');
        $model = Mage::getModel('chickydev_homepageslider/slide');

        if ($id) {
            $model->load($id);
            if (!$model->getId()) {
                $this->_getSession()->addError(
                    Mage::helper('chickydev_homepageslider')->__('This Homepage Slider no longer exists.')
                );
                $this->_redirect('*/*/');
                return;
            }
        }

        $data = $this->_getSession()->getFormData(true);
        if (!empty($data)) {
            $model->setData($data);
        }

        Mage::register('current_slider', $model);

        $this->loadLayout();
        $this->_addContent($this->getLayout()->createBlock('chickydev_homepageslider/adminhtml_slide_edit'));
        $this->renderLayout();
    }

    public function newAction()
    {
        $this->_forward('edit');
    }

    public function saveAction()
    {
        $redirectBack = $this->getRequest()->getParam('back', false);
        if ($data = $this->getRequest()->getPost()) {

            $id = $this->getRequest()->getParam('id');
            $model = Mage::getModel('chickydev_homepageslider/slide');
            if ($id) {
                $model->load($id);
                if (!$model->getId()) {
                    $this->_getSession()->addError(
                        Mage::helper('chickydev_homepageslider')->__('This Homepage Slider no longer exists.')
                    );
                    $this->_redirect('*/*/index');
                    return;
                }
            }

            // save model
            try {
                if(!empty( $_FILES['image']['name'])) {
                    try {
                        $uploader = new Varien_File_Uploader('image');
                        $uploader->setAllowedExtensions(array('jpg','jpeg','gif','png')); // or pdf or anything
                        $uploader->setAllowRenameFiles(false);
                        $uploader->setFilesDispersion(false);
                        $path = Mage::getBaseDir('media') . DS. 'WYSIWYG'.DS . 'homeslide' . DS;
                        $destFile = $path.$_FILES['image']['name'];
                        $filename = $uploader->getNewFileName($destFile);
                        $uploader->save($path, $filename);
                        $data['image'] = 'WYSIWYG/homeslide/'.$filename;
                    }catch(Exception $e) { }
                } else {
                    if (isset($data['image']['delete']) && $data['image']['delete'] == 1)
                    {
                        $data['image']='';
                    }
                    else
                    {
                        unset($data['image']);
                    }
                }
                $model->addData($data);
                $this->_getSession()->setFormData($data);
                $model->save();
                $this->_getSession()->setFormData(false);
                $this->_getSession()->addSuccess(
                    Mage::helper('chickydev_homepageslider')->__('The Homepage Slider has been saved.')
                );
            } catch (Mage_Core_Exception $e) {
                $this->_getSession()->addError($e->getMessage());
                $redirectBack = true;
            } catch (Exception $e) {
                $this->_getSession()->addError(Mage::helper('chickydev_homepageslider')->__('Unable to save the Homepage Slider.'));
                $redirectBack = true;
                Mage::logException($e);
            }

            if ($redirectBack) {
                $this->_redirect('*/*/edit', array('id' => $model->getId()));
                return;
            }
        }
        $this->_redirect('*/*/index');
    }

    public function deleteAction()
    {
        if ($id = $this->getRequest()->getParam('id')) {
            try {
                // init model and delete
                $model = Mage::getModel('chickydev_homepageslider/slide');
                $model->load($id);
                if (!$model->getId()) {
                    Mage::throwException(Mage::helper('chickydev_homepageslider')->__('Unable to find a Homepage Slider to delete.'));
                }
                $model->delete();
                // display success message
                $this->_getSession()->addSuccess(
                    Mage::helper('chickydev_homepageslider')->__('The Homepage Slider has been deleted.')
                );
                // go to grid
                $this->_redirect('*/*/index');
                return;
            } catch (Mage_Core_Exception $e) {
                $this->_getSession()->addError($e->getMessage());
            } catch (Exception $e) {
                $this->_getSession()->addError(
                    Mage::helper('chickydev_homepageslider')->__('An error occurred while deleting Homepage Slider data. Please review log and try again.')
                );
                Mage::logException($e);
            }
            // redirect to edit form
            $this->_redirect('*/*/edit', array('id' => $id));
            return;
        }
// display error message
        $this->_getSession()->addError(
            Mage::helper('chickydev_homepageslider')->__('Unable to find a Homepage Slider to delete.')
        );
// go to grid
        $this->_redirect('*/*/index');
    }
}
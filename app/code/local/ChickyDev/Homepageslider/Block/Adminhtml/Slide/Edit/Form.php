<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 1/1/2017
 * Time: 10:45 AM
 */
class ChickyDev_Homepageslider_Block_Adminhtml_Slide_Edit_Form extends Mage_Adminhtml_Block_Widget_Form
{

    protected function _getModel(){
        return Mage::registry('current_slider');
    }

    protected function _getHelper(){
        return Mage::helper('chickydev_homepageslider');
    }

    protected function _getModelTitle(){
        return 'Homepage Slider';
    }

    protected function _prepareForm()
    {
        $model  = $this->_getModel();
        $modelTitle = $this->_getModelTitle();
        $form   = new Varien_Data_Form(array(
            'id'        => 'edit_form',
            'action'    => $this->getUrl('*/*/save'),
            'method'    => 'post',
            'enctype' => 'multipart/form-data'
        ));

        $fieldset   = $form->addFieldset('base_fieldset', array(
            'legend'    => $this->_getHelper()->__("$modelTitle Information")
        ));

        if ($model && $model->getId()) {
            $modelPk = $model->getResource()->getIdFieldName();
            $fieldset->addField($modelPk, 'hidden', array(
                'name' => $modelPk,
            ));
        }

        $fieldset->addField('textlon', 'text', array(
            'name'      => 'textlon',
            'label'     => $this->_getHelper()->__('Text Lớn'),
            'required'  => true
        ));
        $fieldset->addField('textnho', 'text', array(
            'name'      => 'textnho',
            'label'     => $this->_getHelper()->__('Text Nhỏ'),
            'required'  => true
        ));
        $fieldset->addField('image', 'image', array(
            'label'     => $this->_getHelper()->__('Hình Ảnh'),
            'required'  => true,
            'name'      => 'image',
        ));
        $fieldset->addField('sort', 'text', array(
            'name'      => 'sort',
            'label'     => $this->_getHelper()->__('Số Thứ Tự'),
            'required'  => false
        ));
//          // custom renderer (optional)
//          $renderer = $this->getLayout()->createBlock('Block implementing Varien_Data_Form_Element_Renderer_Interface');
//          $field->setRenderer($renderer);

//      // New Form type element (extends Varien_Data_Form_Element_Abstract)
//        $fieldset->addType('custom_element','MyCompany_MyModule_Block_Form_Element_Custom');  // you can use "custom_element" as the type now in ::addField([name], [HERE], ...)


        if($model){
            $form->setValues($model->getData());
        }
        $form->setUseContainer(true);
        $this->setForm($form);

        return parent::_prepareForm();
    }

}

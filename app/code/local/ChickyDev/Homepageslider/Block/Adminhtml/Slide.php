<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 1/1/2017
 * Time: 10:45 AM
 */
class ChickyDev_Homepageslider_Block_Adminhtml_Slide extends Mage_Adminhtml_Block_Widget_Grid_Container {

    public function __construct()
    {
        $this->_blockGroup      = 'chickydev_homepageslider';
        $this->_controller      = 'adminhtml_slide';
        // $this->_headerText      = $this->__('Grid Header Text');
        // $this->_addButtonLabel  = $this->__('Add Button Label');
        parent::__construct();
            }

    public function getCreateUrl()
    {
        return $this->getUrl('*/*/new');
    }

}


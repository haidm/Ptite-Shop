<?php

class ChickyDev_Homepageslider_Block_Adminhtml_Slide_Renderer_Slide extends Mage_Adminhtml_Block_Widget_Grid_Column_Renderer_Abstract
{
    public function render(Varien_Object $row)
    {
        $val = $row->getData($this->getColumn()->getIndex());
        $url = Mage::getBaseUrl('media') . $val;
        $out = "<img src=". $url ." width='100px'/>";
        return $out;
    }
}
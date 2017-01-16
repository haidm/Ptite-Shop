<?php
class ChickyDev_Homepageslider_Block_Slide extends Mage_Core_Block_Template
{

    public function getSlides()
    {
        $slides = Mage::getModel('chickydev_homepageslider/slide')->getCollection()
            ->setOrder('sort','ASC');
        return $slides;
    }
}
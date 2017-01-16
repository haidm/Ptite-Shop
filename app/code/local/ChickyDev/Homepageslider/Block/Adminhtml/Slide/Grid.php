<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 1/1/2017
 * Time: 10:45 AM
 */
class ChickyDev_Homepageslider_Block_Adminhtml_Slide_Grid extends Mage_Adminhtml_Block_Widget_Grid {

    public function __construct()
    {
        parent::__construct();
        $this->setId('grid_id');
        // $this->setDefaultSort('COLUMN_ID');
        $this->setDefaultDir('asc');
        $this->setSaveParametersInSession(true);
    }

    protected function _prepareCollection()
    {
        $collection = Mage::getModel('chickydev_homepageslider/slide')->getCollection();
        $this->setCollection($collection);
        return parent::_prepareCollection();
    }

    protected function _prepareColumns()
    {

        $this->addColumn('id',
            array(
                'header'=> $this->__('ID'),
                'width' => '50px',
                'index' => 'id'
            )
        );
        $this->addColumn('image',
            array(
                'header'=> $this->__('Image'),
                'index' => 'image',
                'renderer' => 'ChickyDev_Homepageslider_Block_Adminhtml_Slide_Renderer_Slide'
            )
        );
        $this->addColumn('textlon',
            array(
                'header'=> $this->__('Text Lớn'),
                'index' => 'textlon'
            )
        );
        $this->addColumn('textnho',
            array(
                'header'=> $this->__('Text Nhỏ'),
                'index' => 'textnho'
            )
        );
        $this->addColumn('sort',
            array(
                'header'=> $this->__('Số Thứ Tự'),
                'index' => 'sort'
            )
        );

                $this->addExportType('*/*/exportCsv', $this->__('CSV'));
        
                $this->addExportType('*/*/exportExcel', $this->__('Excel XML'));
        
        return parent::_prepareColumns();
    }

    public function getRowUrl($row)
    {
       return $this->getUrl('*/*/edit', array('id' => $row->getId()));
    }

        protected function _prepareMassaction()
    {
        $modelPk = Mage::getModel('chickydev_homepageslider/slide')->getResource()->getIdFieldName();
        $this->setMassactionIdField($modelPk);
        $this->getMassactionBlock()->setFormFieldName('ids');
        // $this->getMassactionBlock()->setUseSelectAll(false);
        $this->getMassactionBlock()->addItem('delete', array(
             'label'=> $this->__('Delete'),
             'url'  => $this->getUrl('*/*/massDelete'),
        ));
        return $this;
    }
    }

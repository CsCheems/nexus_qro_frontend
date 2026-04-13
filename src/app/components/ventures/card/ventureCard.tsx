"use client"

import React from 'react';
import Link from 'next/link';

import styles from "./ventureCard.module.css";

import type { Venture, VentureStage } from '@/types/ventures';
import { formatDate, truncateText } from '@/utils/projectFormat';

interface VentureCardProps {
    venture: Venture;
    isVenturer: boolean;
    showFullCardInfo: boolean;
}

export default function ventureCard({
    venture,
    isVenturer,
    showFullCardInfo
} : VentureCardProps){
    const getStageClass = (stage: VentureStage) => {
        switch(stage){

        }
    };

    const getStageIcon = ( stage: VentureStage) => {
        switch(stage){
            
        }
    }
}


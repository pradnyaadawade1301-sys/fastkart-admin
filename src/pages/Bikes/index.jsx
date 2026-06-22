import { useState, useEffect } from 'react';
import axios from 'axios';
import { Badge, Avatar, PageHeader, useToast } from '../../components/ui';
const API = 'https://fastkart-gt44.onrender.com/api';
const token = () => localStorage.getItem('fk_token') || '';
export default function Page() {
  const toast = useToast();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <PageHeader title="Bike Rentals" sub="Real rentals from app"/>
      <div className="card">
        <div style={{textAlign:'center',padding:64,color:'var(--text-muted)'}}>
          <div style={{fontSize:48,marginBottom:16}}>🚲</div>
          <div style={{fontSize:16,fontWeight:600,color:'var(--text-secondary)',marginBottom:8}}>No Bike Rentals Yet</div>
          <div style={{fontSize:13}}>Data will appear here when customers use the app</div>
        </div>
      </div>
    </div>
  );
}
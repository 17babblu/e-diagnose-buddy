
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, 
  Calendar, 
  FileText, 
  Activity, 
  TrendingUp, 
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Trash2
} from "lucide-react";

interface MedicalRecord {
  id: string;
  date: string;
  condition: string;
  diagnosis: string;
  symptoms: string[];
  treatment: string;
  status: 'active' | 'resolved' | 'chronic';
  severity: 'low' | 'medium' | 'high';
}

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodType: string;
  allergies: string[];
  chronicConditions: string[];
  emergencyContact: string;
  lastVisit: string;
}

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock patient data
  const patient: Patient = {
    id: '12345',
    name: 'John Smith',
    age: 34,
    gender: 'Male',
    bloodType: 'O+',
    allergies: ['Penicillin', 'Shellfish'],
    chronicConditions: ['Hypertension'],
    emergencyContact: '+1 (555) 123-4567',
    lastVisit: '2024-01-15'
  };

  const medicalRecords: MedicalRecord[] = [
    {
      id: '1',
      date: '2024-01-15',
      condition: 'Common Cold',
      diagnosis: 'Viral upper respiratory infection',
      symptoms: ['Runny nose', 'Cough', 'Mild fever'],
      treatment: 'Rest, fluids, OTC pain relievers',
      status: 'resolved',
      severity: 'low'
    },
    {
      id: '2',
      date: '2024-01-08',
      condition: 'Hypertension Follow-up',
      diagnosis: 'Essential hypertension - controlled',
      symptoms: ['No symptoms'],
      treatment: 'Continue current medication',
      status: 'chronic',
      severity: 'medium'
    },
    {
      id: '3',
      date: '2023-12-22',
      condition: 'Gastroenteritis',
      diagnosis: 'Viral gastroenteritis',
      symptoms: ['Nausea', 'Vomiting', 'Diarrhea'],
      treatment: 'BRAT diet, hydration, rest',
      status: 'resolved',
      severity: 'medium'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'chronic': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const filteredRecords = medicalRecords.filter(record =>
    record.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Patient Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-6 h-6 text-blue-600" />
            <span>Patient Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <Label className="text-sm font-medium text-gray-600">Full Name</Label>
              <p className="text-lg font-semibold">{patient.name}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Age & Gender</Label>
              <p className="text-lg font-semibold">{patient.age} years, {patient.gender}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Blood Type</Label>
              <p className="text-lg font-semibold">{patient.bloodType}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Patient ID</Label>
              <p className="text-lg font-semibold">{patient.id}</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <Label className="text-sm font-medium text-gray-600">Allergies</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {patient.allergies.map((allergy, index) => (
                  <Badge key={index} variant="destructive">{allergy}</Badge>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Chronic Conditions</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {patient.chronicConditions.map((condition, index) => (
                  <Badge key={index} variant="secondary">{condition}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{medicalRecords.length}</div>
            <div className="text-sm text-gray-600">Total Records</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Activity className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">
              {medicalRecords.filter(r => r.status === 'resolved').length}
            </div>
            <div className="text-sm text-gray-600">Resolved Cases</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">
              {medicalRecords.filter(r => r.status === 'chronic').length}
            </div>
            <div className="text-sm text-gray-600">Ongoing Conditions</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Records */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Medical Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {medicalRecords.slice(0, 3).map((record) => (
              <div key={record.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{record.condition}</h3>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(record.status)}>
                      {record.status}
                    </Badge>
                    <span className={`text-sm font-medium ${getSeverityColor(record.severity)}`}>
                      {record.severity}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-2">{record.diagnosis}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{record.date}</span>
                  <span>{record.symptoms.length} symptoms reported</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMedicalRecords = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search medical records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Record
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Records List */}
      <div className="space-y-4">
        {filteredRecords.map((record) => (
          <Card key={record.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-600">{record.date}</span>
                  <Badge className={getStatusColor(record.status)}>
                    {record.status}
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{record.condition}</h3>
              <p className="text-gray-700 mb-4">{record.diagnosis}</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Symptoms</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {record.symptoms.map((symptom, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {symptom}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Treatment</Label>
                  <p className="text-sm text-gray-700 mt-1">{record.treatment}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <span className={`text-sm font-medium ${getSeverityColor(record.severity)}`}>
                  Severity: {record.severity.charAt(0).toUpperCase() + record.severity.slice(1)}
                </span>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <User className="w-8 h-8" />
              <div>
                <CardTitle className="text-2xl">Patient Dashboard</CardTitle>
                <p className="text-purple-100">Comprehensive health record management</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-purple-100">Last Visit</div>
              <div className="text-lg font-semibold">{patient.lastVisit}</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Navigation Tabs */}
      <Card>
        <CardContent className="p-0">
          <div className="flex border-b">
            <button
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'records'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('records')}
            >
              Medical Records
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'analytics'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('analytics')}
            >
              Health Analytics
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'records' && renderMedicalRecords()}
      {activeTab === 'analytics' && (
        <Card>
          <CardContent className="p-8 text-center">
            <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Health Analytics Coming Soon</h3>
            <p className="text-gray-600">Advanced health trends and insights will be available in future updates.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PatientDashboard;

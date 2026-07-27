import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Badge, BadgeCategory } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';

const UiPreview: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <div>
        <h1 className="text-4xl mb-6 bg-lemon inline-block px-4 py-2 border-4 border-ink shadow-brutal">
          UI Components Preview
        </h1>
        <p className="text-lg font-bold">Neo-Brutalism Design System</p>
      </div>

      {/* Buttons */}
      <section>
        <h2 className="text-2xl mb-4 border-b-4 border-ink pb-2">Buttons</h2>
        <div className="flex flex-wrap gap-6">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="danger">Danger Button</Button>
        </div>
      </section>

      {/* Inputs */}
      <section>
        <h2 className="text-2xl mb-4 border-b-4 border-ink pb-2">Inputs</h2>
        <div className="max-w-md space-y-6">
          <Input label="Standard Input" placeholder="Enter text here..." />
          <Input label="Error Input" placeholder="Invalid data..." error="This field is required" defaultValue="Wrong data" />
        </div>
      </section>

      {/* Cards */}
      <section>
        <h2 className="text-2xl mb-4 border-b-4 border-ink pb-2">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card hoverEffect>
            <h3 className="text-xl mb-2">Light Card</h3>
            <p className="mb-4 font-bold">Hover over this card to see the lift effect.</p>
            <Button variant="primary">Action</Button>
          </Card>
          
          <Card variant="dark" hoverEffect>
            <h3 className="text-xl mb-2 text-paper">Dark Card</h3>
            <p className="mb-4 font-bold text-paper">Brutalist dark variant.</p>
            <Button variant="secondary">Action</Button>
          </Card>
        </div>
      </section>

      {/* Badges */}
      <section>
        <h2 className="text-2xl mb-4 border-b-4 border-ink pb-2">Badges</h2>
        <div className="flex flex-wrap gap-4">
          <Badge category="electronics" />
          <Badge category="clothing" />
          <Badge category="home" />
          <Badge category="sports" />
          <Badge category="accessories" />
        </div>
      </section>

      {/* Modals */}
      <section>
        <h2 className="text-2xl mb-4 border-b-4 border-ink pb-2">Modals</h2>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          Open Modal
        </Button>
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          title="Important Notice"
        >
          <div className="space-y-4">
            <p className="font-bold text-lg">
              This is a neo-brutalist modal.
            </p>
            <p>
              It features a thick border, a strong shadow, and a simple close button in the header.
            </p>
            <div className="flex justify-end gap-4 mt-6">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setIsModalOpen(false)}>Confirm</Button>
            </div>
          </div>
        </Modal>
      </section>
    </div>
  );
};

export default UiPreview;
